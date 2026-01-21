import React from 'react';
import { Box, Text } from 'ink';
import type { Issue } from '@/types';
import { issueColorMap } from '@/constants';

type IssueLayoutProps = {
  issue: Issue;
};

const IssueLayout: React.FC<IssueLayoutProps> = ({ issue }) => {
  const issueColor = issueColorMap[issue.type];

  return (
    <Box
      borderStyle="round"
      borderColor={issueColor}
      flexDirection="column"
      width={50}
      paddingX={1}
    >
      <Text bold color={issueColor}>
        {issue.label.toUpperCase()}
      </Text>
      <Text>{issue.content}</Text>
    </Box>
  );
};

export default IssueLayout;
