const PubSub = require('../helpers/pub_sub.js');

// let complete = false;

const ActivityView = function(container) {
  this.container = container;
};

ActivityView.prototype.switch = function (x) {
     complete = x;
};

ActivityView.prototype.render = function(activity) {
  //complete = false;

  const activityContainer = document.createElement('div');
  activityContainer.id = 'activity';

  const activityx = this.createHeading(activity.activity);
  activityContainer.appendChild(activityx);

  const location = this.createDetail('Location', activity.location);
  activityContainer.appendChild(location);

  const deleteButton = this.createDeleteButton(activity._id);
  activityContainer.appendChild(deleteButton);

  console.log('not complete',activity.completed);

  if(activity.completed === "not complete") {
    const completeButton = this.createCompleteButton(activity._id);
    activityContainer.appendChild(completeButton);
  }

  if(activity.completed === "completed"){
    const ticked = this.createHeading("Done");
    activityContainer.appendChild(ticked);
  }

  this.container.appendChild(activityContainer);
};

ActivityView.prototype.createHeading = function(textContent) {
  const heading = document.createElement('h3');
  heading.textContent = textContent;
  return heading;
};

ActivityView.prototype.createDetail = function(label, text) {
  const detail = document.createElement('p');
  detail.textContent = `${label}: ${text}`;
  return detail;
};

ActivityView.prototype.createDeleteButton = function(activityId) {
  const button = document.createElement('button');
  button.classList.add('delete-btn');
  button.value = activityId;
  button.textContent = "delete"

  button.addEventListener('click', (event) => { //delete button
    PubSub.publish('activityView:activity-delete-clicked', event.target.value);
    console.log(event.target.value);
  });

  return button;

};

ActivityView.prototype.createCompleteButton = function(activityId) {
  const button2 = document.createElement('button');
  button2.classList.add('complete-btn');
  button2.value = activityId;
  button2.textContent = "complete"


  button2.addEventListener('click', (event) => { //complete button
    // this.switch(true);
    console.log('update button click this this this', event);
    PubSub.publish('activityView:activity-complete-clicked', event.target.value);
  });

  return button2;
};

ActivityView.prototype.statusComplete = function() {
  const status = document.createElement('h1');
  status.textContent = "complete";

  return status;
};

module.exports = ActivityView;
