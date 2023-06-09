import { useEffectok, Flush, get } from './Effectok/hooks';



const chatgpt = {
    //host mychat-3v9.pages.dev
    //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

    async ask(uri, body){
        try {
            const response = await fetch('https://' + get("leftBar").host + '/' + uri, {
              method: 'POST',
              headers: {
                  'authorization': 'Bearer ' + get("leftBar").apikey,
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(body),
              redirect: 'follow'
            });
            if (!response.ok) {
              throw new Error(`Error! status: ${response.status}`);
            }
            const result = await response.json();
            //console.log('result is: ', JSON.stringify(result, null, 4));
            return result;
          } catch (err) {
            console.log(err.message);
          } finally {
          }
    },

    async contextChat(messages){
      let result = await this.ask('v1/chat/completions',{
        model: 'gpt-3.5-turbo',
        messages: messages,
      });
      let ret = result.choices[0].message.content;
      // console.log(ret);
      return ret;
    },


    //聊天功能
    async chat(content){
        let result = await this.ask('v1/chat/completions',{
            model: 'gpt-3.5-turbo',
            messages:[
              {
               "role": "user",
               "content": content
              }
            ],
        });
        let ret = result.choices[0].message.content;
        //console.log(ret);
        return ret;
    },

    //文本不全, 你给前半句他给后半句
    async completions(content){
        let result = await this.ask('v1/completions',{
            model: "text-davinci-003",
            prompt: content,
            max_tokens: 7,
            temperature: 0
        });
        let ret = result.choices[0].text;
        // console.log(ret);
        return ret;
    },

    //配置的相关api
    async models(){
        let result = await this.ask('v1/models/text-davinci-003',{});
        // console.log(result);
    },
}


export default chatgpt;