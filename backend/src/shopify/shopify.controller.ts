import { Controller, Get, Query, Res, Req } from '@nestjs/common';
import config from './../config';
import { Response, Request } from 'express';
import cookie = require('cookie');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const nonce = require('nonce')();

@Controller('shopify')
export class ShopifyController {
  scopes = 'read_products';

  @Get()
  installApp(@Query('shop') shop: string, @Res() res: Response) {
    if (shop) {
      const state = nonce();
      const redirectUri = config.FORWARDING_ADDRESS + config.BASE_URL + '/shopify/callback';
      console.log('Redirect URL', redirectUri)
      const installUrl =
        'https://' +
        shop +
        '/admin/oauth/authorize?client_id=' +
        config.SHOPIFY_API_KEY +
        '&scope=' +
        this.scopes +
        '&state=' +
        state +
        '&redirect_uri=' +
        redirectUri;

      res.cookie('state', state);
      res.redirect(installUrl);
    } else {
      return res
        .status(400)
        .send(
          'Missing shop parameter. Please add ?shop=your-development-shop.myshopify.com to your request',
        );
    }
  }

  @Get('callback')
  callback(@Req() req: Request, @Res() res: Response) {
    const { shop, hmac, code, state } = req.query;
    const stateCookie = cookie.parse(req.headers.cookie).state;
  
    if (state !== stateCookie) {
      return res.status(403).send('Request origin cannot be verified');
    }
  
    if (shop && hmac && code) {
      res.status(200).send('Callback route');
  
      // TODO
      // Validate request is from Shopify
      // Exchange temporary code for a permanent access token
        // Use access token to make API call to 'shop' endpoint
    } else {
      res.status(400).send('Required parameters missing');
    }
  }
}
