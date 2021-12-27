import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppStack/AppStack';

export type Props = NativeStackNavigationProp<
  RootStackParamList,
  keyof RootStackParamList
>;

export default () => useNavigation<Props>();
