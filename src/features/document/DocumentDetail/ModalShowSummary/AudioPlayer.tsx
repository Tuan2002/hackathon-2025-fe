'use client';

import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';

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
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.75);
  const [isMuted, setIsMuted] = useState(false);
  const [audioSrc, setAudioSrc] = useState<string | undefined>(src);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const animationRef = useRef<number | undefined>(undefined);

  // Handle blob conversion to URL when audioBlob changes
  useEffect(() => {
    if (audioBlob) {
      const url = URL.createObjectURL(audioBlob);
      setAudioSrc(url);

      // Clean up the URL when component unmounts
      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [audioBlob]);

  // Update src when it changes externally
  useEffect(() => {
    setAudioSrc(src);
  }, [src]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const setAudioData = () => {
      setDuration(audio.duration);
    };

    const setAudioTime = () => {
      setCurrentTime(audio.currentTime);
    };

    // Events
    audio.addEventListener('loadeddata', setAudioData);
    audio.addEventListener('timeupdate', setAudioTime);
    audio.addEventListener('ended', () => setIsPlaying(false));

    // Cleanup
    return () => {
      audio.removeEventListener('loadeddata', setAudioData);
      audio.removeEventListener('timeupdate', setAudioTime);
      audio.removeEventListener('ended', () => setIsPlaying(false));
    };
  }, [audioSrc]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const togglePlayPause = () => {
    if (isLoading || !audioSrc) return;

    const prevValue = isPlaying;
    setIsPlaying(!prevValue);

    if (!prevValue) {
      audioRef.current?.play();
      animationRef.current = requestAnimationFrame(whilePlaying);
    } else {
      audioRef.current?.pause();
      cancelAnimationFrame(animationRef.current as number);
    }
  };

  const whilePlaying = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      animationRef.current = requestAnimationFrame(whilePlaying);
    }
  };

  const changeRange = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };

  const changeVolume = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : newVolume;
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className={cn('flex flex-col p-4 rounded-xl bg-card border shadow-sm w-full ', className)}>
      {audioSrc && <audio ref={audioRef} src={audioSrc} preload='metadata' />}

      {title && <div className='mb-3 font-medium text-center text-card-foreground'>{title}</div>}

      <div className='flex items-center justify-between mb-2'>
        <span className='text-xs text-muted-foreground w-10'>{formatTime(currentTime)}</span>
        <Slider
          value={[currentTime]}
          max={duration || 100}
          step={0.01}
          onValueChange={changeRange}
          className='mx-2'
          disabled={isLoading || !audioSrc}
        />
        <span className='text-xs text-muted-foreground w-10 text-right'>
          {formatTime(duration)}
        </span>
      </div>

      <div className='flex items-center justify-between mt-2'>
        <Button
          onClick={togglePlayPause}
          size='icon'
          variant='outline'
          className='rounded-full h-12 w-12 flex items-center justify-center border-primary/20 hover:bg-primary/5 hover:text-primary transition-all'
          disabled={isLoading || !audioSrc}
        >
          {isLoading ? (
            <Loader2 className='h-5 w-5 animate-spin' />
          ) : isPlaying ? (
            <Pause className='h-5 w-5' />
          ) : (
            <Play className='h-5 w-5 ml-0.5' />
          )}
        </Button>

        <div className='flex items-center gap-2 w-32'>
          <Button
            onClick={toggleMute}
            size='icon'
            variant='ghost'
            className='h-8 w-8'
            disabled={isLoading || !audioSrc}
          >
            {isMuted ? <VolumeX className='h-4 w-4' /> : <Volume2 className='h-4 w-4' />}
          </Button>
          <Slider
            value={[isMuted ? 0 : volume]}
            max={1}
            step={0.01}
            onValueChange={changeVolume}
            disabled={isLoading || !audioSrc}
          />
        </div>
      </div>
    </div>
  );
}
