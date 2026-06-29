import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

// ================ Constants

export const itemStackings = [
    'Linear',
    'Hyperbolic',
    'Reciprocal',
    'Exponential',
    'Special'
];

export const itemCategories = [
    "Damage",
    "Utility",
    "Healing",
    "Buff",
    "Debuff",
    "Stats",
    "Summon",
    "Protection",
    "Special"
];

export const itemRarities = [
    "Common",
    "Uncommon",
    "Legendary",
    "Boss",
    "Lunar",
    "Void",
    "Meal",
    "Equipment",
    "Lunar Equipment"
];

export const itemOrigins = [
    "Base Game",
    "Survivors of the Void",
    "Seekers of the Storm",
    "Alloyed Collective"
];

export const itemActivations = [
    "Equipment",
    "Kill",
    "Hit",
    "Always",
    "Timer",
    "Damage taken",
    "Interaction",
    "Other"
];

// ================= Types

export type ItemStacking = typeof itemStackings;
export type ItemCategory = typeof itemCategories;
export type ItemRarity = typeof itemRarities;
export type ItemOrigin = typeof itemOrigins;
export type ItemActivation = typeof itemActivations;

// ================= SQL table

export const item = sqliteTable('Item', {
    id: integer('id').primaryKey(),
    name: text('name').notNull(),
    rarity: text('rarity').$type<ItemRarity>(),
    origin: text('origin', { mode: 'json' }).notNull().$type<ItemOrigin>(),
    activation: text('activation', { mode: 'json' }).$type<ItemActivation[]>(),
    description: text('description', { mode: 'json' }).notNull().$type<ItemCategory[]>(),
    stacking: text('stacking', { mode: 'json' }).$type<ItemStacking[]>(),
    unlocked: integer('unlocked', { mode: 'boolean' }).notNull(),
    spawnable: integer('spawnable', { mode: 'boolean' }).notNull()
});
