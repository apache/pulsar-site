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

from execute.pulsar_admin_clidoc_generator import remove_cumulative_output


class CumulativeAdminDocsTest(unittest.TestCase):
    def test_retains_every_subcommand_once(self):
        first = '# brokers\n\n## list\nList active brokers.\n'
        second = first + '\n## leader-broker\nGet the leader.\n'
        final = second + '\n## shutdown\nShutdown gracefully.\n'
        output = first + '\n' + second + '\n' + final + '\n'
        self.assertEqual(remove_cumulative_output(output, 'brokers'), final + '\n')

    def test_fixed_generator_output_is_unchanged(self):
        output = '# brokers\n\n## list\nList active brokers.\n\n## shutdown\nShutdown gracefully.\n'
        self.assertEqual(remove_cumulative_output(output, 'brokers'), output)

    def test_does_not_discard_distinct_content(self):
        output = '# brokers\nFirst document.\n\n# brokers\nDifferent document.\n'
        self.assertEqual(remove_cumulative_output(output, 'brokers'), output)

    def test_leaves_other_modules_and_empty_output_unchanged(self):
        for output in ['', '# tenants\n\n## list\n', '# brokers\n\n# tenants\n']:
            with self.subTest(output=output):
                self.assertEqual(remove_cumulative_output(output, 'brokers'), output)


if __name__ == '__main__':
    unittest.main()
