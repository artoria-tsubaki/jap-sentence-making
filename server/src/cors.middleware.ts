import { Injectable, NestMiddleware } from "@nestjs/common";

@Injectable()

// 跨域中间件
export class CorsMiddleware implements NestMiddleware {
    use(req: any, res: any, next: () => void) {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
        next();
    }
}