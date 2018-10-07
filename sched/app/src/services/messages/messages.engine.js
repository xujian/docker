const stages = [
  {
    name: 'checkin',
    next: {
      command: {
        name: 'scan'
      }
    }
  },
  {
    name: 'lcd',
    steps: [
      {
        name: 'white'
      },
      {
        name: 'blue'
      },
      {
        name: 'red'
      },
      {
        name: 'grey'
      }
    ]
  },
  {
    name: 'touch'
  },
  {
    name: 'camera1'
  },
  {
    name: 'camera2'
  },
  {
    name: 'camera3'
  },
  {
    name: 'camera4'
  },
  {
    name: 'sensors'
  }
]

module.exports = {
  afterDone: message => {
    if (message.params.stage === 'lcd.white') {
      return {
        type: 'goto',
        params: {
          stage: 'lcd.grey'
        }
      }
    }
    return {
      type: ''
    }
  },
  afterStage: message => {
    if (message.params.stage === 'lcd.white' ||
      message.params.stage === 'lcd.blue' ||
      message.params.stage === 'lcd.red' ||
      message.params.stage === 'lcd.grey') {
      return {
        type: 'scan'
      }
    }
    return {
      type: ''
    }
  },
  afterPosition: message => {
    if (message.params.stage === 'lcd') {
      return {
        type: 'scan'
      }
    }
    return {
      type: ''
    }
  }
}