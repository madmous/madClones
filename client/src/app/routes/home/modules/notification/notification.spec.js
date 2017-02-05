import * as notificationActions from './notification';
import reducer from './notification';

describe('notification actions', () => {
  it('should create updateNotification action', () => {
    const payload = {};
    const expectedAction = {
      type: 'UPDATE_NOTIFICATION',
      payload
    };

    expect(notificationActions.updateNotification(payload)).toEqual(expectedAction)
  })

  it('should create hideNotification action', () => {
    const expectedAction = {
      type: 'HIDE_NOTIFICATION'
    };

    expect(notificationActions.hideNotification()).toEqual(expectedAction)
  })
})

describe('notification reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual({
        errorMessages: []
      }
    )
  })

  it('should handle UPDATE_NOTIFICATION', () => {
    const payload = [
      'There was an issue with the server',
      'Try again in a few mins'
    ];

    expect(
      reducer([], {
        type: 'UPDATE_NOTIFICATION',
        payload
      })
    ).toEqual({
        errorMessages: [
          'There was an issue with the server',
          'Try again in a few mins'
        ]
      }
    )
  })

  it('should handle HIDE_NOTIFICATION', () => {
    expect(
      reducer([], {
        type: 'HIDE_NOTIFICATION'
      })
    ).toEqual({
        errorMessages: []
      }
    )
  })
})