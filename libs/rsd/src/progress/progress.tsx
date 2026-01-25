import { css, html } from 'react-strict-dom';
import { colorTextTokens, progressTokens, typographyTokens } from '../tokens/tokens.stylex';

export interface ProgressProps {
  value?: number;
  max?: number;
  label?: string;
}

const styles = css.create({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: progressTokens.height,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontFamily: typographyTokens.fontFamilySans,
    fontSize: typographyTokens.fontSizeSm,
    lineHeight: typographyTokens.lineHeightSnug,
    color: colorTextTokens.primary,
  },
  label: {
    color: colorTextTokens.primary,
  },
  percent: {
    color: colorTextTokens.secondary,
  },
  track: {
    position: 'relative',
    height: progressTokens.height,
    backgroundColor: progressTokens.track,
    borderRadius: 0,
    overflow: 'hidden',
  },
  indicator: {
    position: 'absolute',
    insetBlockStart: 0,
    insetBlockEnd: 0,
    insetInlineStart: 0,
    backgroundColor: progressTokens.indicator,
    borderRadius: 0,
    transitionProperty: 'width',
    transitionDuration: progressTokens.animationDuration,
  },
  width0: { width: '0%' },
  width10: { width: '10%' },
  width20: { width: '20%' },
  width30: { width: '30%' },
  width40: { width: '40%' },
  width50: { width: '50%' },
  width60: { width: '60%' },
  width70: { width: '70%' },
  width80: { width: '80%' },
  width90: { width: '90%' },
  width100: { width: '100%' },
});

type PercentStep = 0 | 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90 | 100;
type WidthStyleKey =
  | 'width0'
  | 'width10'
  | 'width20'
  | 'width30'
  | 'width40'
  | 'width50'
  | 'width60'
  | 'width70'
  | 'width80'
  | 'width90'
  | 'width100';
type WidthStyle = (typeof styles)[WidthStyleKey];

const widthStyles: Record<PercentStep, WidthStyle> = {
  0: styles.width0,
  10: styles.width10,
  20: styles.width20,
  30: styles.width30,
  40: styles.width40,
  50: styles.width50,
  60: styles.width60,
  70: styles.width70,
  80: styles.width80,
  90: styles.width90,
  100: styles.width100,
};

export function Progress({ value = 0, max = 100, label }: ProgressProps) {
  const safeMax = max <= 0 ? 100 : max;
  const clampedValue = Math.min(Math.max(value, 0), safeMax);
  const percent = Math.round((clampedValue / safeMax) * 100);
  const percentStep = Math.min(100, Math.max(0, Math.round(percent / 10) * 10)) as PercentStep;
  const indicatorStyle = widthStyles[percentStep] ?? styles.width0;

  return (
    <html.div style={styles.root}>
      {(label ?? true) && (
        <html.div style={styles.header}>
          {label ? <html.span style={styles.label}>{label}</html.span> : <html.span />}
          <html.span style={styles.percent}>{percent}%</html.span>
        </html.div>
      )}
      <html.div
        role="progressbar"
        aria-valuenow={clampedValue}
        aria-valuemin={0}
        aria-valuemax={safeMax}
        style={styles.track}
      >
        <html.div style={[styles.indicator, indicatorStyle]} />
      </html.div>
    </html.div>
  );
}

export default Progress;
