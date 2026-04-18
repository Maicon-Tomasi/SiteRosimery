import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const blogId = formData.get('blogId') as string;

    if (!file) {
      return NextResponse.json({ error: 'Nenhum arquivo enviado' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = file.name;
    const uploadDir = path.join(process.cwd(), 'public', 'imgsBlog', blogId || 'temp');

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, fileName);
    fs.writeFileSync(filePath, buffer);

    const relativePath = `/imgsBlog/${blogId || 'temp'}/${fileName}`;

    return NextResponse.json({ url: relativePath });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
