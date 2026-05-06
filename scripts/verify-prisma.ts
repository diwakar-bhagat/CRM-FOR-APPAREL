#!/usr/bin/env node

import 'dotenv/config';
import { prisma } from '../src/lib/prisma';

async function main() {
  try {
    console.log('🔗 Testing Prisma connection to Neon database...');
    
    // Simple query to verify connection
    const buyerCount = await prisma.buyer.count();
    const orderCount = await prisma.order.count();
    
    console.log('✅ Connected successfully!');
    console.log(`   Buyers in database: ${buyerCount}`);
    console.log(`   Orders in database: ${orderCount}`);
    
    await prisma.$disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ Connection failed:', error);
    await prisma.$disconnect();
    process.exit(1);
  }
}

main();
