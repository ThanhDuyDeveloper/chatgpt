const chalk = require('chalk');
const gradient = require('gradient-string');
const figlet = require('figlet');

class BeautifulConsole {
  constructor() {
    this.colors = [
      '#ff0000', // Red
      '#ff7f00', // Orange  
      '#ffff00', // Yellow
      '#00ff00', // Green
      '#0000ff', // Blue
      '#4b0082', // Indigo
      '#9400d3'  // Violet
    ];
    
    this.rainbow = gradient(this.colors);
    this.info = chalk.cyan;
    this.success = chalk.green;
    this.warning = chalk.yellow;
    this.error = chalk.red;
    this.debug = chalk.magenta;
  }

  banner(text = 'MESSENGER BOT') {
    console.clear();
    const banner = figlet.textSync(text, {
      font: 'ANSI Shadow',
      horizontalLayout: 'fitted'
    });
    
    console.log(this.rainbow(banner));
    console.log(this.rainbow('═'.repeat(80)));
    console.log();
  }

  log(message, type = 'info') {
    const timestamp = new Date().toLocaleTimeString();
    const timeStr = chalk.gray(`[${timestamp}]`);
    
    switch(type) {
      case 'success':
        console.log(`${timeStr} ${this.success('✓')} ${this.success(message)}`);
        break;
      case 'error':
        console.log(`${timeStr} ${this.error('✗')} ${this.error(message)}`);
        break;
      case 'warning':
        console.log(`${timeStr} ${this.warning('⚠')} ${this.warning(message)}`);
        break;
      case 'debug':
        console.log(`${timeStr} ${this.debug('🔍')} ${this.debug(message)}`);
        break;
      default:
        console.log(`${timeStr} ${this.info('ℹ')} ${this.info(message)}`);
    }
  }

  rainbow(text) {
    return this.rainbow(text);
  }

  loading(text = 'Đang tải...') {
    const frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
    let i = 0;
    
    return setInterval(() => {
      process.stdout.write(`\r${this.info(frames[i])} ${text}`);
      i = (i + 1) % frames.length;
    }, 100);
  }

  stopLoading(interval, message = 'Hoàn thành!') {
    clearInterval(interval);
    process.stdout.write(`\r${this.success('✓')} ${this.success(message)}\n`);
  }

  table(data, title = '') {
    if (title) {
      console.log(this.rainbow(`\n📊 ${title}`));
      console.log('─'.repeat(50));
    }
    
    console.table(data);
  }

  divider(char = '─', length = 80) {
    console.log(this.rainbow(char.repeat(length)));
  }

  center(text, width = 80) {
    const padding = Math.max(0, Math.floor((width - text.length) / 2));
    return ' '.repeat(padding) + text;
  }
}

module.exports = new BeautifulConsole();