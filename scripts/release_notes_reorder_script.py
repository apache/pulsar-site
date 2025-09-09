#!/usr/bin/env python3

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

"""
Script to reorder Pulsar release notes based on a reference file structure
or reorganize a single file using component-based section assignment.

Single file mode: Takes one markdown file and reorganizes it by moving items
to appropriate sections based on their component tags ([broker], [client], etc.)

Reference mode: Takes two markdown files and reorders the second file to match 
the section organization of the first (reference) file.
"""

import re
import sys
from typing import Dict, List, Tuple, Optional
from dataclasses import dataclass

@dataclass
class ReleaseItem:
    """Represents a single release note item"""
    full_line: str
    pr_number: Optional[str] = None
    component: Optional[str] = None
    type_tag: Optional[str] = None

class PulsarReleaseReorderer:
    def __init__(self):
        self.sections = [
            "Library updates",
            "Broker", 
            "Client",
            "Pulsar IO and Pulsar Functions",
            "Others",
            "Tests & CI"
        ]
        
    def extract_pr_number(self, line: str) -> Optional[str]:
        """Extract PR number from a line like ([#24360](...)"""
        match = re.search(r'\(\[#(\d+)\]', line)
        return match.group(1) if match else None
    
    def extract_component_and_type(self, line: str) -> Tuple[Optional[str], Optional[str]]:
        """Extract component and type from lines like [fix][broker] or [improve][client]"""
        match = re.match(r'- \[(\w+)\]\[(\w+)\]', line.strip())
        if match:
            return match.group(2), match.group(1)  # component, type
        return None, None
    
    def parse_file(self, filename: str) -> Dict[str, List[ReleaseItem]]:
        """Parse a release notes file and return items organized by section"""
        sections = {section: [] for section in self.sections}
        current_section = None
        
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()
        
        lines = content.split('\n')
        
        for line in lines:
            # Check if line is a section header
            if line.startswith('### ') and line[4:] in self.sections:
                current_section = line[4:]
                continue
            
            # Check if line is a release item (starts with '- [')
            if line.strip().startswith('- [') and current_section:
                pr_number = self.extract_pr_number(line)
                component, type_tag = self.extract_component_and_type(line)
                
                item = ReleaseItem(
                    full_line=line,
                    pr_number=pr_number,
                    component=component,
                    type_tag=type_tag
                )
                sections[current_section].append(item)
        
        return sections
    
    def determine_section_for_item(self, item: ReleaseItem, reference_sections: Dict[str, List[ReleaseItem]]) -> str:
        """Determine which section an item should go in based on reference file"""
        
        # First, try to find the item by PR number in reference (if reference exists)
        if item.pr_number and reference_sections:
            for section_name, ref_items in reference_sections.items():
                for ref_item in ref_items:
                    if ref_item.pr_number == item.pr_number:
                        return section_name
        
        # Check if line contains "upgrade" (case insensitive) - always goes to Library updates
        if "upgrade" in item.full_line.lower():
            return 'Library updates'
        
        # Use component-based heuristics
        if item.component:
            component_to_section = {
                # Library updates
                'sec': 'Library updates',  # Security updates often involve library upgrades
                
                # Broker
                'admin': 'Broker',
                'broker': 'Broker',
                'meta': 'Broker',
                'ml': 'Broker',  # Managed ledger
                'monitor': 'Broker',
                'offload': 'Broker',
                'schema': 'Broker',
                'storage': 'Broker',
                'txn': 'Broker',  # Transaction
                'zk': 'Broker',  # ZooKeeper
                'bk': 'Broker',  # BookKeeper
                
                # Client
                'client': 'Client',
                
                # Pulsar IO and Pulsar Functions
                'fn': 'Pulsar IO and Pulsar Functions',  # Functions
                'io': 'Pulsar IO and Pulsar Functions',
                
                # Others
                'proxy': 'Others',
                'misc': 'Others',
                'doc': 'Others',
                'site': 'Others',
                'pip': 'Others',
                'ws': 'Others',  # WebSocket
                'cli': 'Others',  # Command line interface
                
                # Tests & CI
                'build': 'Tests & CI',
                'ci': 'Tests & CI',
                'test': 'Tests & CI'
            }
            
            if item.component in component_to_section:
                return component_to_section[item.component]
        
        # Default fallback - place in Others
        return 'Others'
    
    def get_section_order_position(self, item: ReleaseItem, reference_items: List[ReleaseItem]) -> int:
        """Get the relative position of an item within its section based on reference"""
        if not item.pr_number:
            return 999  # Put items without PR numbers at the end
            
        # Find the item in reference and return its position (if reference exists)
        if reference_items:
            for i, ref_item in enumerate(reference_items):
                if ref_item.pr_number == item.pr_number:
                    return i
        
        # If not found in reference or no reference, use component and type for ordering
        type_priority = {'fix': 0, 'improve': 1, 'feature': 2, 'cleanup': 3, 'refactor': 4, 'revert': 5}
        component_priority = {
            # Core components first
            'broker': 0, 'client': 1, 'admin': 2,
            # Storage and ledger
            'ml': 3, 'storage': 4, 'bk': 5, 'offload': 6,
            # Functions and IO
            'fn': 7, 'io': 8,
            # Infrastructure
            'proxy': 9, 'meta': 10, 'zk': 11, 'monitor': 12,
            # Protocol and communication
            'txn': 13, 'schema': 14,
            # Security and build
            'sec': 15, 'build': 16, 'ci': 17, 'test': 18,
            # Documentation and tooling
            'doc': 19, 'site': 20, 'pip': 21,
            # Others components
            'ws': 22, 'cli': 23,
            # Miscellaneous
            'misc': 24
        }
        
        type_pos = type_priority.get(item.type_tag, 999)
        component_pos = component_priority.get(item.component, 999)
        
        return 900 + type_pos * 10 + component_pos  # Put new items near end but ordered
    
    def reorder_file(self, reference_file: Optional[str], target_file: str, output_file: str):
        """Main function to reorder the target file based on reference file structure"""
        
        # Handle reference file parsing
        if reference_file:
            print(f"Parsing reference file: {reference_file}")
            reference_sections = self.parse_file(reference_file)
        else:
            print("Single file mode: Using component-based reorganization")
            reference_sections = {section: [] for section in self.sections}
        
        print(f"Parsing target file: {target_file}")
        target_sections = self.parse_file(target_file)
        
        # Read the original target file to preserve header and structure
        with open(target_file, 'r', encoding='utf-8') as f:
            original_content = f.read()
        
        # Extract header (everything before first ###)
        header_match = re.search(r'^(.*?)(^### )', original_content, re.MULTILINE | re.DOTALL)
        header = header_match.group(1) if header_match else ""
        
        # Collect all items from target file
        all_target_items = []
        for section_items in target_sections.values():
            all_target_items.extend(section_items)
        
        print(f"Found {len(all_target_items)} items to reorder")
        
        # Reorganize items by determining their proper sections
        new_sections = {section: [] for section in self.sections}
        
        for item in all_target_items:
            proper_section = self.determine_section_for_item(item, reference_sections)
            new_sections[proper_section].append(item)
        
        # Sort items within each section based on reference order
        for section_name in self.sections:
            reference_items = reference_sections.get(section_name, [])
            new_sections[section_name].sort(
                key=lambda item: self.get_section_order_position(item, reference_items)
            )
        
        # Rebuild the file content
        new_content = header
        
        for section_name in self.sections:
            items = new_sections[section_name]
            if items:  # Only add section if it has items
                new_content += f"### {section_name}\n\n"
                for item in items:
                    new_content += f"{item.full_line}\n"
                new_content += "\n"
        
        # Add the changelog link if it exists in original
        changelog_match = re.search(r'For the complete list.*', original_content)
        if changelog_match:
            new_content += f"{changelog_match.group(0)}\n"
        
        # Write the reordered file
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        print(f"Reordered file written to: {output_file}")
        
        if reference_file:
            print(f"Used reference file: {reference_file}")
        else:
            print("Used component-based reorganization (no reference file)")
        
        # Print summary
        print("\nSection summary:")
        for section_name in self.sections:
            count = len(new_sections[section_name])
            if count > 0:
                print(f"  {section_name}: {count} items")

def main():
    if len(sys.argv) < 2 or len(sys.argv) > 4:
        print("Usage: python reorder_pulsar_release.py <target_file>")
        print("   or: python reorder_pulsar_release.py <reference_file> <target_file> [output_file]")
        print()
        print("Single file mode: Reorganizes the file using component-based section assignment")
        print("  Example: python reorder_pulsar_release.py pulsar-3.3.8.md")
        print()
        print("Reference mode: Reorganizes target file based on reference file structure") 
        print("  Example: python reorder_pulsar_release.py pulsar-3.0.13.md pulsar-3.3.8.md")
        print("  Example: python reorder_pulsar_release.py pulsar-3.0.13.md pulsar-3.3.8.md pulsar-3.3.8-reordered.md")
        print()
        print("If output_file is not provided, the target_file will be updated in place.")
        sys.exit(1)
    
    if len(sys.argv) == 2:
        # Single file mode - reorganize based on components only
        reference_file = None
        target_file = sys.argv[1]
        output_file = target_file
    else:
        # Reference mode - use reference file for organization
        reference_file = sys.argv[1]
        target_file = sys.argv[2] 
        output_file = sys.argv[3] if len(sys.argv) == 4 else target_file
    
    reorderer = PulsarReleaseReorderer()
    reorderer.reorder_file(reference_file, target_file, output_file)

if __name__ == "__main__":
    main()