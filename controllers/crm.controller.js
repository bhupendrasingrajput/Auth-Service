import { findUserByEmail } from '../services/user.service.js';
import { ApiError } from '../utils/ApiError.js';
import bcrypt from 'bcrypt';