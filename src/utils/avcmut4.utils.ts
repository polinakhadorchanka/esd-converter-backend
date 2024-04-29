import { execSync } from 'child_process';

function execAvCmUt4(docPath: string, signPath?: string) {
  try {
    if (signPath) execSync(`AvCmUt4.exe -V "${signPath}" -F "${docPath}" -NA`);
    else execSync(`AvCmUt4.exe -V "${docPath}" -NA`);
    return;
  } catch (error) {
    return new Error('Command AvCmUt4.exe failed');
  }
}

module.exports = { execAvCmUt4 };
