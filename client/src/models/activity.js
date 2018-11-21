const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');

const Activity = function(url){
  this.url = url;
  this.request = new RequestHelper(this.url);
}


Activity.prototype.bindEvents = function () {
  PubSub.subscribe('activityView:activity-delete-clicked', (event) =>{
    this.deleteActivity(event.detail);
  })
  PubSub.subscribe('activityView:activity-complete-clicked', (event) =>{
    this.updateActivity(event.detail);
  })
  PubSub.subscribe('ActivityView:ActivitySubmitted', (event) => {
    this.postActivity(event.detail);
  });
};

Activity.prototype.getData = function () {
  this.request.get()
  .then((activities) =>{
    PubSub.publish('Activities:data-loaded', activities);
  })
  .catch(console.error);
};

Activity.prototype.postActivity = function (activity) {
  console.log("what data is in here?", activity);
  this.request.post(activity)
  .then((activities) => {
    console.log('post sent to database',activities)
PubSub.publish('Activities:data-loaded', activities);
  })
  .catch(console.error);
};

Activity.prototype.deleteActivity = function (activityId) {
this.request.delete(activityId)
.then((activities) =>{
  console.log('delete sent to database',activities)
  PubSub.publish('Activities:data-loaded', activities);
})
.catch(console.error);
};

Activity.prototype.updateActivity = function (activityId) {
  console.log("over here", activityId);
this.request.put(activityId, {"completed": "completed"})
.then((activities) =>{
  console.log('update sent to database',activities)
  PubSub.publish('Activities:data-loaded', activities);
})
.catch(console.error);
};


module.exports = Activity;
