import jsftp from 'jsftp'

const ftpFolder = process.env.FTP_FOLDER ?? '/'

const ftpConfig = {
  host: process.env.FTP_HOST ?? '',
  port: +(process.env.FTP_PORT ?? ''),
  user: process.env.FTP_USER ?? '',
  pass: process.env.FTP_PASS ?? '',
}

console.log(ftpConfig)

const FTP = new jsftp(ftpConfig)

export const getFiles = () =>
  new Promise<string>((resolve, reject) => {
    FTP.list(ftpFolder, (err, res) => {
      if (err) return reject(err)
      console.log('getFiles', res)
      resolve(res)
    })
  })

export const addFile = (fileBuffer: Buffer, fileName: string) =>
  new Promise<void>((resolve, reject) => {
    FTP.put(fileBuffer, `${ftpFolder}/${fileName}`, err => {
      if (err) return reject(err)
      resolve()
    })
  })

export default FTP
