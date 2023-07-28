"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usersRouter = express_1.default.Router();
const http_errors_1 = __importDefault(require("http-errors"));
// Get users listing
const users = [
    { userId: 1, name: 'Samantha' },
    { userId: 2, name: 'David' },
    { userId: 3, name: 'Santiago' },
    { userId: 4, name: 'Joel' },
];
// usersRouter.use(express.json())
usersRouter.get('/', (req, res, next) => {
    res.json(users);
});
usersRouter.get('/:userId', (req, res, next) => {
    const foundUser = users.find(user => user.userId === Number(req.params.userId));
    if (!foundUser) {
        return next((0, http_errors_1.default)(404, 'Not found'));
    }
    res.json(foundUser);
});
usersRouter.post('/', (req, res, next) => {
    const { body } = req;
    if (typeof body.name !== 'string') {
        return next((0, http_errors_1.default)(422, 'Validation error'));
    }
    const newUser = {
        userId: users.length + 1,
        name: body.name
    };
    users.push(newUser);
    res.status(201).json(users);
});
exports.default = usersRouter;
