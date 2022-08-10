import { HardhatRuntimeEnvironment } from 'hardhat/types';
const task = async (args: any, hre: HardhatRuntimeEnvironment) => {
  const { ethers, deployments, getNamedAccounts } = hre;
  const { deployerAddress } = await getNamedAccounts();
  const deployer = await ethers.getSigner(deployerAddress);
  const token = (await ethers.getContractAt('GLDToken', (await deployments.get('GLDToken')).address)).connect(deployer);

  console.log(`✅ GLDToken(${token.address}),account(${deployer.address})(${await token.balanceOf(deployer.address)})`);
  if (Number(args.amount) > 0 && args.target) {
    const tx = await token.transfer(args.target, ethers.utils.parseEther(args.amount));
    console.log(`🔵tx(${tx.hash}),transferring...`);
    await tx.wait();
    console.log(`✅ GLDToken(${token.address}),source(${deployer.address})(${await token.balanceOf(deployer.address)})`);
    console.log(`✅ GLDToken(${token.address}),target(${args.target})(${await token.balanceOf(args.target)})`);
  }
};
export default task;
