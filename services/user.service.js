import axios from "axios";
import config from "../config/index.js";
const { userService } = config.services;

export const findUserByEmail = async (email) => {
    try {
        const { data } = await axios.get(`${userService}/find-by-email`, { params: { email } });
        return data.user;
    } catch (error) {
        throw new Error('Error fetching user by email');
    }
}