import { task } from 'hardhat/config';
/*
task('flow_sell').setAction(flow_sell);
task('flow_buy').setAction(flow_buy).addOptionalParam('nft', 'nft address').addOptionalParam('id', 'token id');
*/
import sendGldToken from './sendGldToken';
import setBannedMode from './setBannedMode';
task('setBannedMode').setAction(setBannedMode).addParam('mode', 'Banned Mode Value[0-3]');
task('sendGldToken').setAction(sendGldToken).addParam('amount', 'token amount by Ether').addParam('target', 'target address');
