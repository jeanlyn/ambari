#!/usr/bin/env python2.6
"""
Licensed to the Apache Software Foundation (ASF) under one
or more contributor license agreements.  See the NOTICE file
distributed with this work for additional information
regarding copyright ownership.  The ASF licenses this file
to you under the Apache License, Version 2.0 (the
"License"); you may not use this file except in compliance
with the License.  You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

Ambari Agent

"""


from resource_management import *


class SqoopServiceCheck(Script):
  def service_check(self, env):
    import params
    env.set_params(params)
    if params.security_enabled:
        Execute(format("{kinit_path_local}  -kt {smoke_user_keytab} {smoke_test_user}"))
    Execute("sqoop version",
            user = params.smokeuser,
            logoutput = True
    )

if __name__ == "__main__":
  SqoopServiceCheck().execute()