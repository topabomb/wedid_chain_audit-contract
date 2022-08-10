import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts, ethers } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  const banned = await deploy('Banned', {
    from: deployer,
    args: [],
    log: true,
    proxy: {
      proxyContract: 'OpenZeppelinTransparentProxy',
      owner: deployer,
      execute: { init: { methodName: 'initialize', args: [] } },
    },
  });
  console.log(`🟢[${hre.network.name}] Banned address: ${banned.address}`);

  const gldtoken = await deploy('GLDToken', {
    from: deployer,
    args: [ethers.utils.parseEther('1000000')],
    log: true,
  });
  console.log(`🟢[${hre.network.name}] GLDToken address: ${gldtoken.address}`);
};
export default func;
