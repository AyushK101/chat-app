import cookie from 'cookie';
import { ioType } from '../app';
import ApiError from '../utils/apiError';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { JWT_SECRET } from '../constants';
import { User } from '../models/user.model';

const initializeIO = (io: ioType) => {
  return io.on('connection', async (socket) => {
    const cookies = cookie.parse(socket.handshake.headers?.cookie || '');
    let token = cookies?.token;
    if (!token) token = socket.handshake.auth?.token;

    if (!token) throw new ApiError(401, 'Un-authorized handshake. Token is missing.');

    const decodedToken = jwt.verify(token, JWT_SECRET) as JwtPayload;

    if (!decodedToken) throw new ApiError(401, 'Un-authorized handshake. Token is invalid.');

    const user = await User.findById(decodedToken?._id);

    if (!user) throw new ApiError(401, 'Un-authorized handshake. Token is invalid');

    socket.user = user;

    socket.join(user._id.toString());
  });
};

export { initializeIO };
