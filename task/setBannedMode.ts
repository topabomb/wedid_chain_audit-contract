import { HardhatRuntimeEnvironment } from 'hardhat/types';
const task = async (args: any, hre: HardhatRuntimeEnvironment) => {
  const { ethers, deployments, getNamedAccounts } = hre;
  const { deployerAddress } = await getNamedAccounts();
  const deployer = await ethers.getSigner(deployerAddress);
  const banned = (await ethers.getContractAt('Banned', (await deployments.get('Banned')).address)).connect(deployer);
  //0x97f735d5
  console.log(banned.interface.getSighash(banned.interface.getFunction('isBanned')));
  //0x97f735d5000000000000000000000000bd4e7ccc76b0891dc26e853a953219a303bb6749
  console.log(banned.interface.encodeFunctionData('isBanned', ['0xbD4e7CCc76b0891dC26e853a953219A303bB6749']));

  console.log(`✅ Banned(${banned.address}),Mode(${await banned.mode()})`);
  if (Number(args.mode) < 4 && Number(args.mode) >= 0) {
    const newMode = Number(args.mode);
    if (Number(await banned.mode()) != newMode) {
      const tx = await banned.setMode(newMode);
      console.log(`🔵tx(${tx.hash}),changing...`);
      await tx.wait();
      console.log(`✅ Banned(${banned.address}) is changed,Mode(${await banned.mode()})`);
    } else {
      console.log('❌mode not need to change!');
    }
  }
};
export default task;
