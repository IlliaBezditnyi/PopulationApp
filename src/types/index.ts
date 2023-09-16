export interface HeaderProps {
  title: string;
}

export interface BarDataProps {
  Nation: string;
  Year: string;
  Population: number;
}

export interface BarProps {
  totalHeight: number;
  barHeight: number;
  barWidth: number;
  barMargin: number;
  population: number;
}

export interface ChartSelectButtonProps {
  text: string;
  onPress: () => void;
}
