import { MongoClient } from 'mongodb'
import { Schema, model, Document as DocumentType } from 'mongoose'

export const getDb = async () => {
  const url = 'mongodb://localhost/mutual-docs'
  const client = new MongoClient(url, { useUnifiedTopology: true })
  if (!client.isConnected()) {
    await client.connect()
  }
  const db = client.db()

  return db
}

export interface DocumentData extends DocumentType {
  _id: string,
  userId: string,
  title: string,
  image: string,
  data: Object,
  createdAt: Date,
  updatedAt: Date
}

export const Document = new Schema({
  _id: String,
  userId: String,
  title: String,
  image: String,
  data: Object,
  createdAt: Date,
  updatedAt: Date
}, { versionKey: false })

export const documentModel = model<DocumentData>('Document', Document, 'Document')