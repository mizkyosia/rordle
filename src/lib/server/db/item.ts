import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

// ================ Type bits & pieces

export type ItemStackingBase = 'Linear'
    | 'Hyperbolic'
    | 'Reciprocal'
    | 'Exponential'
    | 'Special';

// ================= Full types
export type ItemStacking = [ItemStackingBase] | [ItemStackingBase, ItemStackingBase];

export type ItemCategory = "Damage"
    | "Utility"
    | "Healing"
    | "Buff"
    | "Debuff"
    | "Stats"
    | "Summon"
    | "Protection"
    | "Special";

export type ItemRarity = "Common"
    | "Uncommon"
    | "Legendary"
    | "Boss"
    | "Lunar"
    | "Void"
    | "Meal"
    | "Equipment"
    | "Lunar Equipment";

export type ItemOrigin = "Base Game"
    | "Survivors of the Void"
    | "Seekers of the Storm"
    | "Alloyed Collective";

export type ItemActivation = "Equipment"
    | "Kill"
    | "Hit"
    | "Always"
    | "Timer"
    | "Damage taken"
    | "Interaction"
    | "Other";

// ================= SQL table

export const item = sqliteTable('Item', {
    id: integer('id').primaryKey(),
    name: text('name').notNull(),
    rarity: text('rarity').notNull().$type<ItemRarity>(),
    origin: text('origin', { mode: 'json' }).notNull().$type<ItemOrigin>(),
    activation: text('activation', { mode: 'json' }).notNull().$type<ItemActivation[]>(),
    description: text('description', { mode: 'json' }).notNull().$type<ItemCategory[]>(),
    stacking: text('stacking', { mode: 'json' }).$type<ItemStacking>(),
    spawnable: integer('spawnable', { mode: 'boolean' }).notNull()
});
