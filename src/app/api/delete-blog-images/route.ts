import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const blogId = searchParams.get('blogId');

    if (!blogId) {
      return NextResponse.json({ error: 'ID do blog não fornecido' }, { status: 400 });
    }

    const uploadDir = path.join(process.cwd(), 'public', 'imgsBlog', blogId);

    if (fs.existsSync(uploadDir)) {
      // Remove o diretório e todo o seu conteúdo
      fs.rmSync(uploadDir, { recursive: true, force: true });
      return NextResponse.json({ message: 'Imagens deletadas com sucesso' });
    }

    return NextResponse.json({ message: 'Nenhuma imagem encontrada para este post' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
