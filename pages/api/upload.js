import multiparty from 'multiparty';
import {PutObjectCommand, S3Client} from "@aws-sdk/client-s3";
import fs from 'fs';
import mime from 'mime-types';

export default async function handle(req, res) {
    const form = new multiparty.Form();
    const {fields, files} = await new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
            if (err) reject(err);
            resolve({fields, files});
        });
    });
    // console.log("files " , files);
    const client = new S3Client({
        region: process.env.S3_BUCKET_REGION,
        credentials: {
            accessKeyId: process.env.S3_ACCESS_KEY,
            secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
        }
    });

    const links = [];
    for (const file of files.file) {
        const ext = file?.originalFilename.split('.').pop();
        const newFileName = Date.now() + '.' + ext;
        await client.send(new PutObjectCommand({
            Bucket: process.env.S3_BUCKET_NAME,
            Key: newFileName, // new filename
            Body: fs.readFileSync(file.path),
            ACL: 'public-read',
            ContentType: mime.lookup(file.path)
        }));
        const link = `https://${process.env.S3_BUCKET_NAME}.s3.amazonaws.com/${newFileName}`;
        links.push(link);
    };
    // console.log('fields ' , fields);
    return res.json({links});
}

export const config = {
    api : {
        bodyParser: false
    }
}
