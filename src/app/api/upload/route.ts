import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const text = formData.get('text') as string || '';
    const files = formData.getAll('files') as File[];
    
    // Log the received data (in a real app, you would save this to a database)
    console.log('Received text:', text);
    console.log('Received files:', files.map(f => f.name));
    
    // Redirect back to the home page with a success message
    return NextResponse.redirect(new URL('/?upload=success', request.url));
    
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.redirect(new URL('/?upload=error', request.url));
  }
} 