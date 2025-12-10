import styled from '@emotion/native';
import { colors, spacing } from '../constants/theme';

interface DividerProps {
  height?: number;
  color?: string;
  marginVertical?: number;
}

export default function Divider({
  height = 10,
  color = colors.divider,
  marginVertical = 0,
}: DividerProps) {
  return (
    <DividerView
      style={{
        height,
        backgroundColor: color,
        marginVertical,
      }}
    />
  );
}

const DividerView = styled.View``;

// Thin divider for list separators
export function ThinDivider({ color = colors.border }: { color?: string }) {
  return <ThinDividerView style={{ backgroundColor: color }} />;
}

const ThinDividerView = styled.View`
  height: 1px;
`;
