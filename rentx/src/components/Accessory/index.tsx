import React, { ReactElement } from 'react';
import { SvgProps } from 'react-native-svg';
import { useTheme } from 'styled-components';

import { Container, Name } from './styles';

interface Props {
  name: string;
  icon: React.FC<SvgProps>;
}

export function Accessory({ name, icon: Icon }: Props): ReactElement {
  const theme = useTheme();

  return (
    <Container>
      <Icon width={32} height={32} fill={theme.colors.header} />
      <Name>{name}</Name>
    </Container>
  );
}
