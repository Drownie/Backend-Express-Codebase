import {
    Column, 
    CreateDateColumn, 
    Entity, 
    Index, 
    PrimaryGeneratedColumn, 
    UpdateDateColumn,
} from "typeorm";

@Entity({ name: 'user' })
export class UserEntity {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @Index({ unique: true })
    @Column()
    username: string;

    @Index({ unique: true })
    @Column()
    email: string;

    @Index()
    @Column()
    hash: string;

    @Index()
    @Column()
    is_active: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}