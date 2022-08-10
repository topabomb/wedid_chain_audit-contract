import hre from 'hardhat';
import { time, loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { anyValue } from '@nomicfoundation/hardhat-chai-matchers/withArgs';
import { expect } from 'chai';
import { ethers, upgrades, tracer } from 'hardhat';
const enabledRracer = true; //是否启用代码内的tracer
describe('banned验证', () => {
  /*
      用于替代beforeEach,使用loadFixture执行该方法一次，并进行快照，后续的loadFixture将直接读取快照的状态
      */
  async function deployFixture() {
    const Banned = await ethers.getContractFactory('Banned');
    const banned = await upgrades.deployProxy(Banned, [], {});
    await banned.deployed();
    return { banned };
  }
  describe('基本功能', () => {
    it('验证创建钱包及owner', async () => {
      const { banned } = await deployFixture();
      const dapp1 = '0xbD4e7CCc76b0891dC26e853a953219A303bB6749';
      await banned.setMode(0); //白名单模式
      await banned.addWhite(dapp1);
      expect(await banned.isBanned(dapp1)).to.eq(false);
    });
  });
});
