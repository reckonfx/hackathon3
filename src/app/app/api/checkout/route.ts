import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-01-27.acacia', // Make sure to use the latest API version
});

// Define your route handler
export async function POST(request: Request) {
  try {
    const { items, success_url, cancel_url } = await request.json();

    // Create the line items for the checkout session based on cart data
    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: 'usd', // Change to your currency if needed
        product_data: {
          name: item.name,
          images: [item.image], // Assuming image URL is available
        },
        unit_amount: item.price * 100, // Convert to the smallest currency unit (cents for USD)
      },
      quantity: item.quantity,
    }));

    // Create a Checkout Session with Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url,
      cancel_url,
    });

    // Return the session URL to redirect the user to Stripe's checkout page
    return NextResponse.json({ url: session.url });

  } catch (error) {
    console.error('Error creating Stripe session:', error);
    return NextResponse.json({ error: 'Checkout failed, please try again.' }, { status: 500 });
  }
}
