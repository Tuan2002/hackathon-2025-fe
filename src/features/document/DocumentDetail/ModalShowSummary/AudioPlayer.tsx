'use client';

import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { useAudioPlayer } from './useAudioPlayer';

interface AudioPlayerProps {
  src?: string;
  audioBlob?: Blob;
  title?: string;
  className?: string;
  isLoading?: boolean;
}

export function AudioPlayer({
  src,
  audioBlob,
  title,
  className,
  isLoading = false,
}: AudioPlayerProps) {
  const {
    audioRef,
    audioSrc,
    isPlaying,
    duration,
    currentTime,
    volume,
    isMuted,
    togglePlayPause,
    changeRange,
    changeVolume,
    toggleMute,
    formatTime,
  } = useAudioPlayer(src, audioBlob);

  // Hiện Skeleton nếu chưa có audioSrc hoặc đang loading
  if (isLoading || !audioSrc) {
    return (
      <div
        className={cn(
          'flex flex-col p-4 rounded-xl border shadow-sm w-full bg-muted dark:bg-muted/40',
          className,
        )}
      >
        {title && <div className='mb-3 font-medium text-center text-card-foreground'>{title}</div>}
        <Skeleton className='h-4 w-full mb-4 rounded' />
        <div className='flex items-center justify-between'>
          <Skeleton className='h-12 w-12 rounded-full' />
          <Skeleton className='h-4 w-32 rounded' />
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'flex flex-col p-4 rounded-xl border shadow-sm w-full bg-card text-card-foreground transition-colors',
        className,
      )}
    >
      {audioSrc && <audio ref={audioRef} src={audioSrc} preload='metadata' />}

      {title && <div className='mb-3 font-medium text-center'>{title}</div>}

      {/* Thanh thời gian */}
      <div className='flex items-center justify-between mb-2'>
        <span className='text-xs text-muted-foreground w-10'>{formatTime(currentTime)}</span>
        <Slider
          value={[currentTime]}
          max={duration || 100}
          step={0.01}
          onValueChange={changeRange}
          className='mx-2'
        />
        <span className='text-xs text-muted-foreground w-10 text-right'>
          {formatTime(duration)}
        </span>
      </div>

      {/* Nút điều khiển */}
      <div className='flex items-center justify-between mt-3'>
        <Button
          onClick={togglePlayPause}
          size='icon'
          variant='outline'
          className='rounded-full h-12 w-12 flex items-center justify-center border-primary/20 hover:bg-primary/10 hover:text-primary transition-all'
        >
          {isPlaying ? <Pause className='h-5 w-5' /> : <Play className='h-5 w-5 ml-0.5' />}
        </Button>

        <div className='flex items-center gap-2 w-36'>
          <Button onClick={toggleMute} size='icon' variant='ghost' className='h-8 w-8'>
            {isMuted ? <VolumeX className='h-4 w-4' /> : <Volume2 className='h-4 w-4' />}
          </Button>
          <Slider value={[isMuted ? 0 : volume]} max={1} step={0.01} onValueChange={changeVolume} />
        </div>
      </div>
    </div>
  );
}
