const listenChannels = [
  "1072337728416530473",
  "1062153096765120602",
  "1062153015219466321",
  "815670710353264700",
  "639852536248926219",
  "1088607729435803839",
  "639852614074368000",
  "639852662921101324",
  "1042155306622406727",
  "1088602954711453738",
  "1088603084105715732",
  "639613763217260555",
  "804035758683848776",
  "727908305036640327",
  "735673622357606490",
  "730101605214584942",
  "639852503147741221",
  "725501264653451355",
  "639612405864726531",
  "639610822473154623",
  "777903554639298571"

  // DEBUG
  "826967447042785360"
]

// How often to stop tracking shit (in ms)
const RESET_RATE = 1000 * 60
const damperThingy = 0.5

const TWO_HOURS = 1000 * 60 * 60 * 2

const scoreHistory = {}
const MAX_HISTORY = 6

const ONE_MINUTE = 1000 * 60

const ADMIN_CHANNEL = "668302298828767251"
// const ADMIN_CHANNEL = "530597070558461972"

export default (bastion) => {
  let analyze = {}
  let lastAnalyze = {}

  const resetCounts = () => {
    lastAnalyze = Object.assign({}, analyze)

    for (var k in lastAnalyze) {
      const arr = scoreHistory[k] || []
      const sc = getScore(k)

      if (arr.length > MAX_HISTORY) {
        arr.splice(0, 1)
      }
      
      const data = Object.assign({
        score: sc
      }, lastAnalyze[k])
      arr.push(data)
      scoreHistory[k] = arr
    }

    analyze = listenChannels.reduce( (obj, channelID) => {
      obj[channelID] = {
        msgCount: 0,
        userIDS: new Set()
      }
      return obj
    }, {})
  }

  const getScore = (channelID) => {
    if (!lastAnalyze[channelID]) return 0;
    const msgs = lastAnalyze[channelID].msgCount
    const unique = lastAnalyze[channelID].userIDS.size

    return msgs * (damperThingy*Math.pow(unique, 2))
  }

  // bastion.on("message", ({userID, channelID, message}) => {
  //   if (message.startsWith("!s") && channelID === ADMIN_CHANNEL) {
  //     const [cmd, CID] = message.split(" ")
  //     if (!CID) return bastion.send(channelID, "Need a channel ID")
  //     const history = scoreHistory[CID]

  //     const output = history.map( n => `S: ${n.score} | C: ${n.msgCount} | U: ${n.userIDS.size}`).join('\n')
  //     bastion.send(channelID, bastion.helpers.code(output))
  //     return;
  //   }

  //   if ( (listenChannels.indexOf(channelID) === -1) ) return;

  //   const derp = analyze[channelID]
  //   derp.msgCount++
  //   derp.userIDS.add(userID)

  //   // const score = getScore(channelID)
  //   // console.log("SCORE", score)
  //   // console.log(message, userID, channelID)
  // })

  resetCounts()

  // Do the thing
  setInterval(() => resetCounts(), RESET_RATE)

  // Do the actual calculations
  const monitor = (onDuckSpawn) => {
    console.log(`Beginning monitoring for duck spawn`)

    const interval = setInterval(() => {
      const channel = checkChannels()
      if (!channel) return;

      clearInterval(interval)
      onDuckSpawn(channel)

      // const mention = `<#${channel}>`
      // bastion.send(ADMIN_CHANNEL, `-> POST DUCK in ${mention}`)
      // setTimeout(() => {
      //   monitor()
      // }, TWO_HOURS)
    }, ONE_MINUTE)
  }
  
  const checkChannels = () => {
    for (var cid in scoreHistory) {
      const high = scoreHistory[cid].find( n => n.score >= 350)
      const med = scoreHistory[cid].filter( n => n.score >= 200)

      if (high) {
        console.log(`>>HIGH threshold reached! Score: ${high.score}, messages: ${high.msgCount}, users: ${high.userIDS.size}`)
        return cid;
      }

      if (med.length >= 2) {
        console.log(`>>MED threshold reached! ${med.length} samples > 200`)
        return cid;
      }
    }
    return null;
  }

  return {
    monitor: (onDuckSpawn) => monitor(onDuckSpawn)
  }
}
