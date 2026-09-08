import { Product } from "../../products/entities/product.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column('decimal', { precision: 10, scale: 2 })
    total: number;

    @Column({ type: 'varchar', length: 30, nullable: true })
    coupon: string;

    @Column('decimal', { nullable: true, default: 0 })
    discount: number;
    
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
    transactionDate: Date;

    @OneToMany(() => TransactionContents, contents => contents.transaction)
    contents: TransactionContents[];
}

@Entity()
export class TransactionContents {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column('int')
    quantity: number;

    @Column('decimal', { precision: 10, scale: 2 })
    price: number;
    
    @ManyToOne(() => Product, product => product.id, {eager: true, cascade: true})
    product: Product;

    @ManyToOne(() => Transaction, transaction => transaction.id, {cascade: true})
    transaction: Transaction;
}
