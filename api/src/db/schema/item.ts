import { integer, boolean, pgEnum, varchar, text, pgTable } from 'drizzle-orm/pg-core';
import { type ItemActivation, type ItemCategory, type ItemStacking, itemRarities, itemOrigins } from "shared";

// ================= SQL table

const rarityEnum = pgEnum("item_rarity", itemRarities);
const originEnum = pgEnum("item_origin", itemOrigins);

export const item = pgTable('Item', {
    id: integer('id').primaryKey().notNull(),
    name: varchar('name', { length: 64 }).notNull(),
    rarity: rarityEnum('rarity'),
    origin: originEnum('origin').notNull(),
    activation: text('activation').array().$type<ItemActivation[]>(),
    description: text('description').array().notNull().$type<ItemCategory[]>(),
    stacking: text('stacking').array().$type<ItemStacking[]>(),
    unlocked: boolean('unlocked').notNull(),
    spawnable: boolean('spawnable').notNull()
});
