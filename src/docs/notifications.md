## Server-side event
To subscribe for live notification client-side should connect to server-side events with [EventSource](https://developer.mozilla.org/en-US/docs/Web/API/EventSource).

[Server-side event](https://docs.nestjs.com/techniques/server-sent-events) was defined in:

```bash
src/modules/notifications/notifications.controller.ts > NotificationsController > sendNotification
```
## Authentication

Server-side events uses [AuthGuard](https://docs.nestjs.com/guards).
[JWT token](https://jwt.io/) extracts from Url query parameter "token".

Server-side event auth guard:
```bash
src/modules/auth/guards/sse-auth.guard.ts
```
Server-side event JWT strategy:
```bash
src/modules/auth/strategies/sse-jwt.strategy.ts
```
## Entity

To store notifications we have Notification entity in database:
![notifications database schema](https://i.imgur.com/YDRvuUG.png)
- **to** – key of user entity, to whom notification is intended.
- **user** - key of user entity, user information in notification (for example, if it’s new message this field indicates from whom it came).
- **job** – key of job entity, all notification are related to some job. This field refers to it.
- **message** – string, currently only used for new chat messages. May be used for other types of notifications in the future.
- **type** – enum. Type of notification.
	- message – new chat message.
	- newOffer – new offer for freelancer.
	- acceptedOffer – accepted offer from freelancer.
	- declinedOffer - declined offer from freelancer.
	- newProposal – new proposal by freelancer for job.
	- newInterview – new interview invitation by job owner to freelancer.
- **is_read** – boolean, indicates whether this notification has been read by the user it was intended for.
- **created_at** – date, date and time of notification.

## Event Emitter

Notification module uses EventEmitter package provided by Nest.js. More information about it [here](https://docs.nestjs.com/techniques/events).

You can find emit method in Notification Service:
```bash
src/modules/notifications/notifications.service.ts > NotificationsService > emit
```
This service could be injected in any other service you want. To create new notification you should call this method with‘userId’(to whom this notification should be sent) and notification payload

Example:
```bash
this.notificationService.emit(userId, {
        type: NotificationType.MESSAGE,
        user: payload.user,
        message: messageText,
        job: payload.job,
      });
```

Inside emit method firstly we insert this notification to database and get from insert result id and creation date of new row in table. Then we emit new event in EventEmitter with this data. In turn, EventEmitter triggers an event in Server-side events subscription. If user to whom this notification is intended for, connected to Server-side events by EventSource he will receive new event.

##  Get new notifications

To get new notification in case if user was offline you should use ‘Get notifications’ endpoint.
```bash
http://baseurl/notifications (GET)
```
You will receive all notifications with property ‘is_read’ false.
If you want to mark some notification as read. You should use ‘Mark notifications as read’ endpoint
```bash
http://baseurl/notifications/mark (POST)
```
**Body**: array of notification's id

**Example of body**: [4, 5, 6]

**Result**: notification with IDs 4, 5, 6 will be marked as read.

Also you can mark all not read notifications as read with endpoint ‘Mark all notifications as read’:
```bash
http://baseurl/notifications/markall (POST)
```
All this endpoints requires Bearer token in header ‘authorization’.
