# Licensed to the Apache Software Foundation (ASF) under one
# or more contributor license agreements.  See the NOTICE file
# distributed with this work for additional information
# regarding copyright ownership.  The ASF licenses this file
# to you under the Apache License, Version 2.0 (the
# "License"); you may not use this file except in compliance
# with the License.  You may obtain a copy of the License at
#
#   http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing,
# software distributed under the License is distributed on an
# "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
# KIND, either express or implied.  See the License for the
# specific language governing permissions and limitations
# under the License.

import unittest

from execute.pulsar_clidoc_generator import remove_log_lines


class RemoveLogLinesTest(unittest.TestCase):
    def test_removes_log_lines(self):
        output = ('2026-10-26T11:10:43,530+0200 [main] INFO  org.apache.bookkeeper.meta.MetadataDrivers'
                  ' - BookKeeper metadata driver manager initialized\n'
                  '# initialize-cluster-metadata\n\n'
                  '2026-10-26T11:10:44,001Z [main] WARN  org.example.Foo - warning\n'
                  '|Flag|Description|Default|\n')
        self.assertEqual(remove_log_lines(output),
                         '# initialize-cluster-metadata\n\n|Flag|Description|Default|\n')

    def test_leaves_document_unchanged(self):
        output = '# version\n\n| `-g, --generate-docs` | Generate docs, default 2026-10-26T11:10:43 |false|\n'
        self.assertEqual(remove_log_lines(output), output)


if __name__ == '__main__':
    unittest.main()
