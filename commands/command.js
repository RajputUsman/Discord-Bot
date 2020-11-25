const {prefix} = require('../config.json');

module.exports = (client, aliases, perms, callback) => {

    if(typeof aliases === 'string'){
        aliases = [aliases];
    }
    
    client.on('message', message => {
        if(perms === 'admin'){
            if(message.member.hasPermission('ADMINISTRATOR')){
                const {content} = message;

                aliases.forEach(alias => {
                    const command = `${prefix}${alias}`;

                    if(content.startsWith(`${command}`) || content === command){
                        console.log(`running the command ${command}`);
                        callback(message);
                    }

                })
            }else{
                return;
            }
        }else{
            const {content} = message;

            aliases.forEach(alias => {
                const command = `${prefix}${alias}`;

                if(content.startsWith(`${command}`) || content === command){
                    console.log(`running the command ${command}`);
                    callback(message);
                }

            })
        }
        
    })
}