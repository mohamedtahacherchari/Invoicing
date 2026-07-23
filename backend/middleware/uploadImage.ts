import type { NextFunction, Request, Response } from 'express'

interface UploadedImageFile {
    size: number
    mimetype: string
    tempFilePath: string
}

interface UploadFiles {
    file: UploadedImageFile
}

type UploadRequest = Request & { files?: UploadFiles }

const fs: typeof import('fs') = require('fs');

module.exports = async function(
    req: UploadRequest,
    res: Response,
    next: NextFunction,
): Promise<Response | void> {
    try {
        
        if(!req.files || Object.keys(req.files).length === 0)
            return res.status(400).json({msg: "No files were uploaded."})
        
        const file = req.files.file;
        //console.log(file)

        if(file.size > 1024 * 1024){
            removeTmp(file.tempFilePath)
            return res.status(400).json({msg: "Size too large."})
        } // 1mb

        if(file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png'){
            removeTmp(file.tempFilePath)
            return res.status(400).json({msg: "File format is incorrect."})
        }

        next()
    } catch (err) {
        return res.status(500).json({msg: (err as Error).message})
    }
}

const removeTmp = (path: string): void => {
    fs.unlink(path, err => {
        if(err) throw err
    })
}
