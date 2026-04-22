import { put } from '@vercel/blob';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const blogId = formData.get('blogId') as string;

    if (!file) {
      return NextResponse.json({ error: 'Nenhum arquivo enviado' }, { status: 400 });
    }

    // Cria o caminho organizando por blogId
    const pathName = `imgsBlog/${blogId || 'temp'}/${file.name}`;

    // Faz o upload direto para o Vercel Blob
    const blob = await put(pathName, file, {
      access: 'public',
      token: process.env.BLOB_READ_WRITE_TOKEN, // Torna a imagem acessível via URL
    });

    // O blob.url já é a URL absoluta da imagem pronta para ser salva no banco de dados e usada na tag <img>
    return NextResponse.json({ url: blob.url });
    
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}