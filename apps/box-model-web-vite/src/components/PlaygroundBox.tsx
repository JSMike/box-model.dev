import { useState } from 'react';
import { CardBox } from '@box-model/web/card';
import { ButtonBox } from '@box-model/web/button';
import { BadgeBox } from '@box-model/web/badge';
import { DividerBox } from '@box-model/web/divider';

export function PlaygroundBox() {
  const [variant, setVariant] = useState<'primary' | 'secondary' | 'tertiary'>('primary');
  const [size, setSize] = useState<'medium' | 'large'>('medium');

  return (
    <CardBox className="widget widget--playground">
      <div slot="header" className="widget__header">
        <h3>Component Playground</h3>
        <BadgeBox variant="info">Interactive</BadgeBox>
      </div>
      
      <div className="playground-layout">
        <div className="playground-preview">
          <ButtonBox variant={variant} size={size}>
            Click Me
          </ButtonBox>
        </div>
        
        <DividerBox orientation="vertical" />
        
        <div className="playground-controls">
          <div className="control-group">
            <label>Variant</label>
            <div className="button-group">
              <ButtonBox 
                variant={variant === 'primary' ? 'primary' : 'secondary'} 
                onClick={() => setVariant('primary')}
                size="small"
              >
                Primary
              </ButtonBox>
              <ButtonBox 
                variant={variant === 'secondary' ? 'primary' : 'secondary'} 
                onClick={() => setVariant('secondary')}
                size="small"
              >
                Secondary
              </ButtonBox>
               <ButtonBox 
                variant={variant === 'tertiary' ? 'primary' : 'secondary'} 
                onClick={() => setVariant('tertiary')}
                size="small"
              >
                Tertiary
              </ButtonBox>
            </div>
          </div>
          
          <div className="control-group">
            <label>Size</label>
            <div className="button-group">
              <ButtonBox 
                variant={size === 'medium' ? 'primary' : 'secondary'} 
                onClick={() => setSize('medium')}
                size="small"
              >
                MD
              </ButtonBox>
              <ButtonBox 
                variant={size === 'large' ? 'primary' : 'secondary'} 
                onClick={() => setSize('large')}
                size="small"
              >
                LG
              </ButtonBox>
            </div>
          </div>
        </div>
      </div>
    </CardBox>
  );
}
