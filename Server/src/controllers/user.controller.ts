import { ResultSetHeader } from 'mysql2'
import db from '../config/db'
import { validateCreateUser, validateLoginUser } from '../schemas/user.schema'
import { CreateUserParams, UpdateUserParams } from '../types/user.interface'
class UserController {
	async createUser(params: CreateUserParams) {
		try {
			if (!validateCreateUser(params)) {
				return {
					code: -32602,
					message: 'invalid params',
					errors: validateCreateUser.errors,
				}
			}
			const { name, email, password, phone, address } = params

			const [result] = await db.execute<ResultSetHeader>(
				'INSERT INTO users (name, email, password, phone, address) VALUES (?, ?, ?, ?, ?)',
				[name, email, password, phone, address]
			)
		} catch (error) {
			console.error('❌ Error creating user:', error)
			throw new Error('Database error')
		}
	}
	async updateUser(params: UpdateUserParams) {
		try {
			if (!validateCreateUser(params)) {
				return {
					code: -32602,
					message: 'invalid params',
					errors: validateCreateUser.errors,
				}
			}
			const { name, email, password, phone, address, id } = params

			const [result] = await db.execute<ResultSetHeader>(
				'UPDATE users SET name = ?, email = ?, password = ?, phone = ?, address = ? WHERE id = ?',

				[name, email, password, phone, address, id]
			)
		} catch (error) {
			console.error('❌ Error  update user:', error)
			throw new Error('Database error')
		}
	}
	async getUser(params: { id: number }) {
		try {
			if (!validateCreateUser(params)) {
				return {
					code: -32602,
					message: 'invalid params',
					errors: validateCreateUser.errors,
				}
			}
			const { id } = params

			const [result] = await db.execute<ResultSetHeader>(
				'SELECT * FROM users WHERE id = ?',
				[id]
			)
		} catch (error) {
			console.error('❌ Error getting user:', error)
			throw new Error('Database error')
		}
	}
	async deleteUser(params: { id: number }) {
		try {
			if (!validateCreateUser(params)) {
				return {
					code: -32602,
					message: 'invalid params',
					errors: validateCreateUser.errors,
				}
			}
			const { id } = params

			const [result] = await db.execute<ResultSetHeader>(
				'DELETE  FROM users WHERE id = ?',
				[id]
			)
		} catch (error) {
			console.error('❌ Error delete user:', error)
			throw new Error('Database error')
		}
	}
	async login(params: { email: string; password: string }) {
		try {
			if (!validateLoginUser(params)) {
				return {
					code: -32602,
					message: 'invalid params',
					errors: validateCreateUser.errors,
				}
			}
			const { email, password } = params

			const [result] = await db.execute<ResultSetHeader>(
				'SELECT * FROM users WHERE email = ? AND password = ?',
				[email, password]
			)
		} catch (error) {
			console.error('❌ Error login:', error)
			throw new Error('Database error')
		}
	}
}

export default new UserController()
