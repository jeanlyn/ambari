/**
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements. See the NOTICE file distributed with this
 * work for additional information regarding copyright ownership. The ASF
 * licenses this file to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

var App = require('app');
var dateUtils = require('utils/date');

/**
 * Base class of all Jobs.
 *
 * This class is meant to be extended and not instantiated directly.
 */
App.AbstractJob = DS.Model.extend({
  id : DS.attr('string'),
  name : DS.attr('string'),
  user : DS.attr('string'),
  startTime : DS.attr('number'),
  endTime : DS.attr('number'),

  startTimeDisplay : function() {
    var startTime = this.get('startTime');
    if (startTime > 0) {
      return dateUtils.dateFormat(startTime);
    } else {
      return "";
    }
  }.property('startTime'),

  endTimeDisplay : function() {
    var endTime = this.get('endTime');
    if (endTime > 0) {
      return dateUtils.dateFormat(endTime);
    } else {
      return "";
    }
  }.property('endTime'),

  /**
   * Provides the duration of this job. If the job has not started, duration
   * will be given as 0. If the job has not ended, duration will be till now.
   * 
   * @return {Number} Duration in milliseconds.
   */
  duration : function() {
    var startTime = this.get('startTime');
    var endTime = this.get('endTime');
    if(endTime < startTime) {
      endTime =  App.get('currentServerTime');
    }
    return dateUtils.duration(startTime, endTime);
  }.property('startTime', 'endTime'),

  durationDisplay : function() {
    return dateUtils.timingFormat(this.get('duration'), true);
  }.property('duration'),

  /**
   * Type of this job. Should be one of constants defined in App.JobType
   */
  jobType : DS.attr('string')
});

App.JobType = {
  HIVE : "hive"
};

App.AbstractJob.FIXTURES = [];
