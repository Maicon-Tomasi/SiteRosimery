import { del, list } from '@vercel/blob';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const blogId = searchParams.get('blogId');

    if (!blogId) {
      return NextResponse.json({ error: 'ID do blog não fornecido' }, { status: 400 });
    }

    const prefix = `imgsBlog/${blogId}/`;

    // 1. Adicione o token aqui na função list
    const { blobs } = await list({ 
      prefix,
      token: process.env.BLOB_READ_WRITE_TOKEN 
    });

    if (blobs.length === 0) {
      return NextResponse.json({ message: 'Nenhuma imagem encontrada para este post' });
    }

    const urlsToDelete = blobs.map((blob) => blob.url);

    // 2. Adicione o token aqui na função del
    await del(urlsToDelete, {
      token: process.env.BLOB_READ_WRITE_TOKEN 
    });

    return NextResponse.json({ message: 'Imagens deletadas com sucesso do Vercel Blob' });
    
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}