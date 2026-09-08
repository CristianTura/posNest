import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction, TransactionContents } from './entities/transaction.entity';
import { Between, FindManyOptions, Repository } from 'typeorm';
import { Product } from '../products/entities/product.entity';
import { endOfDay, isValid, parseISO, startOfDay } from 'date-fns';
import { CouponsService } from '../coupons/coupons.service';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction) private readonly transactionRepository: Repository<Transaction>,
    @InjectRepository(TransactionContents) private readonly transactionContentsRepository: Repository<TransactionContents>,
    @InjectRepository(Product) private readonly productRepository: Repository<Product>,
    private readonly couponService: CouponsService
  ) {}

  async create(createTransactionDto: CreateTransactionDto) {

    await this.productRepository.manager.transaction(async (transacctionEntityManager) => {
      const transaction = new Transaction();
      const total = createTransactionDto.contents.reduce((total, item) => total + (item.price * item.quantity), 0);
      transaction.total = total;

      if(createTransactionDto.coupon) {
        const coupon = await this.couponService.applyCoupon(createTransactionDto.coupon);
        const discount = (coupon.percentage/100) * total;
        transaction.discount = discount;
        transaction.coupon = coupon.name;
        transaction.total -= discount;
      }

      for (const content of createTransactionDto.contents) {
        const product = await transacctionEntityManager.findOneBy(Product, { id: content.productId });
        
        let errors: string[] = [];
        if (!product) {
          errors.push(`El producto con id ${content.productId} no existe`);
          throw new NotFoundException(errors);
        }
        if( content.quantity > product.inventory) {
          errors.push(`El articulo ${product.name} no tiene suficiente inventario`);
          throw new BadRequestException(errors);
        }
        product.inventory -= content.quantity;

        //Create transaction contents instance
        const transactionContent = new TransactionContents();
        transactionContent.price = content.price;
        transactionContent.product = product;
        transactionContent.quantity = content.quantity;
        transactionContent.transaction = transaction;

        await transacctionEntityManager.save(transaction);
        await transacctionEntityManager.save(transactionContent);
      }
    });
    return "Venta realizada exitosamente";

    
  }

  findAll(transactionDate?: string) {
    const options : FindManyOptions<Transaction> = {
      relations: {
        contents: true
      }
    };

    if(transactionDate) {
      const date = parseISO(transactionDate);
      if(!isValid(date)) {
        throw new BadRequestException('Fecha invalida');
      }
      const start = startOfDay(date);
      const end = endOfDay(date);
      options.where = {
        transactionDate: Between(start, end)
      };
    }
    return this.transactionRepository.find(options);
  }

  async findOne(id: number) {
    const transaction = await this.transactionRepository.findOne({ where: { id }, relations: { contents: true } });
    if(!transaction) {
      throw new NotFoundException('Transaccion no encontrada');
    }
    return transaction;
  }

  async update(id: number, updateTransactionDto: UpdateTransactionDto) {
    const transaction = await this.transactionRepository.findOne({ where: { id } });
    if(!transaction) {
      throw new NotFoundException('Transaccion no encontrada');
    }
    return this.transactionRepository.update(id, updateTransactionDto);
  }

  async remove(id: number) {
    const transaction = await this.findOne(id);

    for (const content of transaction.contents) {
      const product = await this.productRepository.findOneBy({ id: content.product.id });
      if(!product) {
        throw new NotFoundException('Producto no encontrado');
      }
      product.inventory += content.quantity;
      await this.productRepository.save(product);
      
      const transactionContent = await this.transactionContentsRepository.findOne({ where: { id: content.id } });
      if(!transactionContent) {
        throw new NotFoundException('Contenido de transaccion no encontrado');
      }
      await this.transactionContentsRepository.remove(transactionContent);
    }
    await this.transactionRepository.remove(transaction);
    return {message: 'Transaccion eliminada exitosamente'};
  }
}

